import React from "react"
import ContentLoader from "react-content-loader"

const Loader = (props) => (
    <ContentLoader
        speed={2}
        width={550}
        height={70}
        viewBox="0 0 550 70"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="30" y="0" rx="5" ry="5" width="330" height="63" />
        <rect x="379" y="0" rx="8" ry="8" width="63" height="63" />
        <rect x="460" y="0" rx="8" ry="8" width="63" height="63" />
    </ContentLoader>
)

export default Loader