"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Shield,
    Lock,
    Eye,
    Database,
    Cloud,
    Check,
    X,
    Server,
    Cookie,
    Brain,
} from "lucide-react";
import Link from "next/link";

const privacyFeatures = [
    {
        icon: Lock,
        title: "Local Processing Only",
        description:
            "All PDF merging happens directly in your browser using JavaScript and Web APIs.",
        status: "guaranteed",
    },
    {
        icon: Cloud,
        title: "No Cloud Storage",
        description:
            "Your PDF files are never uploaded to any server or stored in the cloud.",
        status: "guaranteed",
    },
    {
        icon: Database,
        title: "No Data Collection",
        description:
            "We don't collect, log, or store any information about your PDFs or usage.",
        status: "guaranteed",
    },
    {
        icon: Brain,
        title: "No AI Training",
        description:
            "Your PDFs are never used to train AI models or any form of machine learning.",
        status: "guaranteed",
    },
    {
        icon: Cookie,
        title: "No Tracking Cookies",
        description:
            "We don't use tracking cookies or third-party analytics scripts.",
        status: "guaranteed",
    },
    {
        icon: Server,
        title: "No Server Communication",
        description:
            "After the page loads, everything works offline — there is no communication with servers.",
        status: "guaranteed",
    },
];

const whatWeDoNot = [
    "Upload your PDF files",
    "Store your data",
    "Track your usage",
    "Use cookies for tracking",
    "Share with third parties",
    "Train AI with your PDFs",
    "Access unrelated device files",
    "Keep any file history",
];

const whatWeDo = [
    "Merge PDFs locally in your browser",
    "Respect your privacy",
    "Delete file data after processing",
    "Work completely offline",
    "Provide transparent code",
    "Give you full control",
];

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-black">
            <div className="fixed inset-0 bg-gradient-to-br from-amber-900/10 via-black to-yellow-900/10" />

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl mb-6">
                        <Shield className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Privacy Comes First
                    </h1>
                    <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                        Your PDFs never leave your device. We built this tool
                        with privacy and security at the core.
                    </p>
                </motion.div>

                {/* Privacy Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid md:grid-cols-2 gap-6 mb-16"
                >
                    {privacyFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                x: index % 2 === 0 ? -20 : 20,
                            }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
                        >
                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <feature.icon className="w-6 h-6 text-green-400" />
                                </div>
                                <div className="ml-4 flex-1">
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* What We Do/Don't Do */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="grid md:grid-cols-2 gap-8 mb-16"
                >
                    <div className="bg-red-500/5 backdrop-blur-lg rounded-xl p-6 border border-red-500/20">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                            <X className="w-6 h-6 mr-2 text-red-400" />
                            What We Don&apos;t Do
                        </h3>
                        <ul className="space-y-3">
                            {whatWeDoNot.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center text-gray-400"
                                >
                                    <X className="w-4 h-4 mr-2 text-red-400 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-green-500/5 backdrop-blur-lg rounded-xl p-6 border border-green-500/20">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                            <Check className="w-6 h-6 mr-2 text-green-400" />
                            What We Do
                        </h3>
                        <ul className="space-y-3">
                            {whatWeDo.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center text-gray-400"
                                >
                                    <Check className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                {/* Technical Verification */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10"
                >
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
                        <Eye className="w-7 h-7 mr-3 text-amber-400" />
                        Verify It Yourself
                    </h2>

                    <div className="space-y-4 text-gray-300">
                        <div>
                            <h3 className="font-semibold text-white mb-2">
                                1. Network Monitor Test
                            </h3>
                            <p className="text-sm">
                                Open your browser&apos;s Developer Tools (F12) →
                                Network tab → Add and merge some PDFs.
                                You&apos;ll see ZERO network requests for your
                                file data.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-white mb-2">
                                2. Offline Test
                            </h3>
                            <p className="text-sm">
                                Load the site, then disconnect from the
                                internet. Merging still works perfectly because
                                all processing is done locally.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-white mb-2">
                                3. Code Inspection
                            </h3>
                            <p className="text-sm">
                                The code is <Link href="https://github.com/dannisonluk/combinePDF">open source</Link>. Check
                                `/utils/combinepdf/pdfCombiner.ts` — you&apos;ll find only
                                local PDF processing, no fetch() or external
                                network requests.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Footer Message */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-center mt-16"
                >
                    <p className="text-gray-500 text-sm">
                        Privacy isn&apos;t just a feature — it&apos;s our
                        promise. Your PDFs stay on your device, always.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}