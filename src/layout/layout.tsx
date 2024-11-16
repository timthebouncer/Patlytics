import React, {FC, ReactNode} from "react";
const Layout: FC<{children: ReactNode}>=({children})=>{
    return (
        <div className="pt-4 relative left-1/2 -translate-x-1/2 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
            {children}
        </div>
    )

}

export default Layout