"use client";

import React, {
	RefCallback,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";

export interface ListboxOption<T> {
	value: T;
	label: string;
	disabled?: boolean;
}

interface ListboxProps<T> {
	value: T;
	onChange: (v: T) => void;
	options: Array<ListboxOption<T>>;
	buttonClassName?: string;
	optionsClassName?: string;
	optionClassName?:
		| string
		| ((active: boolean, selected: boolean, disabled: boolean) => string);
	placeholder?: string;
	getOptionLabel?: (opt: ListboxOption<T>) => string;
	getOptionKey?: (opt: ListboxOption<T>, index: number) => React.Key;
	disabled?: boolean;
}

export function Listbox<T>({
	value,
	onChange,
	options,
	buttonClassName,
	optionsClassName,
	optionClassName,
	placeholder = "Select…",
	getOptionLabel = (opt) => opt.label,
	getOptionKey = (_opt, idx) => idx,
	disabled = false,
}: ListboxProps<T>) {
	const [open, setOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState<number>(() =>
		Math.max(
			0,
			options.findIndex((o) => !o.disabled && Object.is(o.value, value))
		)
	);

	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const listRef = useRef<HTMLUListElement | null>(null);
	const optionRefs = useRef<Array<HTMLLIElement | null>>([]);
	const labelId = useId();
	const listboxId = useId();

	const selectedIndex = useMemo(
		() => options.findIndex((o) => Object.is(o.value, value)),
		[options, value]
	);

	useEffect(() => {
		if (!open || options.length === 0) return;
		let idx = activeIndex;
		if (idx < 0 || idx >= options.length || options[idx]?.disabled) {
			idx = options.findIndex((o) => !o.disabled);
		}
		setActiveIndex(idx === -1 ? 0 : idx);
	}, [open, options, activeIndex]);

	const openList = useCallback(() => {
		if (!disabled) setOpen(true);
	}, [disabled]);

	const closeList = useCallback(() => {
		setOpen(false);
		buttonRef.current?.focus();
	}, []);

	const choose = useCallback(
		(idx: number) => {
			const opt = options[idx];
			if (!opt || opt.disabled) return;
			onChange(opt.value);
			setOpen(false);
			buttonRef.current?.focus();
		},
		[onChange, options]
	);

	const moveActive = useCallback(
		(dir: 1 | -1) => {
			if (options.length === 0) return;
			let idx = activeIndex;
			for (let i = 0; i < options.length; i++) {
				idx = (idx + dir + options.length) % options.length;
				if (!options[idx].disabled) {
					setActiveIndex(idx);
					break;
				}
			}
		},
		[activeIndex, options]
	);

	const moveToEdge = useCallback(
		(edge: "start" | "end") => {
			if (options.length === 0) return;
			const ids =
				edge === "start"
					? [...options.keys()]
					: [...options.keys()].reverse();
			for (const idx of ids) {
				if (!options[idx].disabled) {
					setActiveIndex(idx);
					break;
				}
			}
		},
		[options]
	);

	useEffect(() => {
		if (!open) return;
		optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
	}, [open, activeIndex]);

	useEffect(() => {
		if (!open) return;
		const onDocClick = (e: MouseEvent) => {
			const t = e.target as Node;
			if (
				!buttonRef.current?.contains(t) &&
				!listRef.current?.contains(t)
			) {
				setOpen(false);
			}
		};
		const onEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				closeList();
			}
		};
		document.addEventListener("mousedown", onDocClick);
		document.addEventListener("keydown", onEscape);
		return () => {
			document.removeEventListener("mousedown", onDocClick);
			document.removeEventListener("keydown", onEscape);
		};
	}, [open, closeList]);

	const selectedLabel =
		selectedIndex >= 0
			? getOptionLabel(options[selectedIndex])
			: placeholder;

	return (
		<div className="relative">
			<button
				ref={buttonRef}
				type="button"
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-controls={listboxId}
				aria-labelledby={labelId}
				disabled={disabled}
				onClick={() => (open ? closeList() : openList())}
				onKeyDown={(e) => {
					if (disabled) return;
					switch (e.key) {
						case "ArrowDown":
						case "ArrowUp":
							e.preventDefault();
							if (!open) setOpen(true);
							setActiveIndex(
								selectedIndex >= 0
									? selectedIndex
									: Math.max(
											0,
											options.findIndex(
												(o) => !o.disabled
											)
									  )
							);
							break;
						case "Enter":
						case " ":
							e.preventDefault();
							setOpen((v) => !v);
							break;
						default:
							break;
					}
				}}
				className={
					buttonClassName ??
					"w-full cursor-pointer bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-left text-white focus:outline-none focus:border-purple-500"
				}
			>
				<span
					id={labelId}
					className="block truncate"
				>
					{selectedLabel}
				</span>
				<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-300">
					▾
				</span>
			</button>

			{open && (
				<ul
					id={listboxId}
					ref={listRef}
					role="listbox"
					aria-activedescendant={
						activeIndex >= 0
							? `${listboxId}-opt-${activeIndex}`
							: undefined
					}
					tabIndex={-1}
					className={
						optionsClassName ??
						"absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-lg bg-zinc-900/95 backdrop-blur border border-white/10 py-1 text-sm shadow-lg focus:outline-none"
					}
					onKeyDown={(e) => {
						switch (e.key) {
							case "ArrowDown":
								e.preventDefault();
								moveActive(1);
								break;
							case "ArrowUp":
								e.preventDefault();
								moveActive(-1);
								break;
							case "Home":
								e.preventDefault();
								moveToEdge("start");
								break;
							case "End":
								e.preventDefault();
								moveToEdge("end");
								break;
							case "Enter":
							case " ":
								e.preventDefault();
								choose(activeIndex);
								break;
							case "Tab":
								setOpen(false);
								break;
							case "Escape":
								e.preventDefault();
								closeList();
								break;
							default:
								break;
						}
					}}
				>
					{options.map((opt, idx) => {
						const active = idx === activeIndex;
						const selected = idx === selectedIndex;
						const base =
							typeof optionClassName === "function"
								? optionClassName(
										active,
										selected,
										!!opt.disabled
								  )
								: optionClassName ??
								  "relative cursor-pointer select-none px-3 py-2";
						const stateClasses = opt.disabled
							? "text-gray-500 cursor-not-allowed"
							: active
							? "bg-white/10 text-white"
							: "text-gray-300";

						// Properly typed ref callback
						const setRef: RefCallback<HTMLLIElement> = (el) => {
							optionRefs.current[idx] = el;
						};

						return (
							<li
								key={getOptionKey(opt, idx)}
								id={`${listboxId}-opt-${idx}`}
								role="option"
								aria-selected={selected}
								aria-disabled={opt.disabled ? true : undefined}
								ref={setRef}
								className={`${base} ${stateClasses}`}
								onMouseEnter={() =>
									!opt.disabled && setActiveIndex(idx)
								}
								onMouseDown={(e) => e.preventDefault()}
								onClick={() => choose(idx)}
							>
								<div className="flex items-center">
									<span
										className={`mr-2 h-4 w-4 ${
											selected
												? "text-purple-400"
												: "text-transparent"
										}`}
										aria-hidden="true"
									>
										✓
									</span>
									<span className="truncate">
										{getOptionLabel(opt)}
									</span>
								</div>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
