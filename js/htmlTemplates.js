function controlPanelForTabletStyle(){

    return`
    @media only screen and (max-width: 767px) {
        h1 {
            display: none !important;
        }
        #canvas {
            width: 100dvw;
            height: 100dvh;
        }
        #overlay-canvas-start {
            width: 100dvw;
            height: 100dvh;
        }
        #overlay-canvas-outro {
            width: 100dvw;
            height: 100dvh;
        }
    }
`
}