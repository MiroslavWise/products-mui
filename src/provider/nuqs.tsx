"use client"

import { PropsWithChildren } from "react"
import { NuqsAdapter } from "nuqs/adapters/next/app"

export default ({ children }: PropsWithChildren) => <NuqsAdapter>{children}</NuqsAdapter>
