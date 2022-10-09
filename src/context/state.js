import { cloneElement } from "react";
import { AuthUserProvider } from "./auth";

function ProviderComposer({ contexts, children }) {
    return contexts.reduceRight(
        (kids, parent) => cloneElement(parent, { children: kids }),
        children
    );
}

const ContextProvider = ({ children }) => {
    return (
        <ProviderComposer contexts={[<AuthUserProvider />]}>
            {children}
        </ProviderComposer>
    );
};

export default ContextProvider;
