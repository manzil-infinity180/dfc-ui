import { ReactNode } from 'react';
export default function Code({ children }: { children: ReactNode }) {
    return (
        <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              {children}
        </code>
    )
}