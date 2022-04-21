import {
    Instagram,
    Home,
    PenTool,
    MapPin,
    Activity,
    Circle,
    Twitter,
    ExternalLink,
    Send,
    Sun,
    Moon
} from "react-feather";

const iconWidth = 1

export const HomeIcon = (
    <Home className="w-5 h-5" stroke-width={iconWidth}/>
);

export const BlogIcon = (
    <PenTool className="w-5 h-5" stroke-width={iconWidth}/>
);

export const SunIcon = (
    <Sun className="w-5 h-5" stroke-width={iconWidth}/>
);

export const MoonIcon = (
    <Moon className="w-5 h-5" stroke-width={iconWidth}/>
);

export const MapIcon = (
    <MapPin className="w-5 h-5" stroke-width={iconWidth}/>
);
export const TimelineIcon = (
    <Circle className="w-5 h-5" stroke-width={iconWidth}/>
);
export const LogIcon = (
    <Activity className="w-5 h-5" stroke-width={iconWidth}/>
);

export const InstagramIcon = (
    <Instagram className="w-5 h-5" stroke-width={iconWidth}/>
);

export const TwitterIcon = (
    <Twitter className="w-5 h-5" stroke-width={iconWidth}/>
);

export const ExternalLinkIcon = (
    <ExternalLink className="w-5 h-5" stroke-width={iconWidth}/>
);

export const EmailIcon = (
    <Send className="w-5 h-5" stroke-width={iconWidth}/>
);

export const SpinnerIcon = (
    <svg version="1.0" width="100%" height="100%" viewBox="0 0 128 128">
        <g>
            <path d="M59.6 0h8v40h-8V0z" fill="#000"/>
            <path d="M59.6 0h8v40h-8V0z" fill="#ccc" transform="rotate(30 64 64)"/>
            <path d="M59.6 0h8v40h-8V0z" fill="#ccc" transform="rotate(60 64 64)"/>
            <path d="M59.6 0h8v40h-8V0z" fill="#ccc" transform="rotate(90 64 64)"/>
            <path d="M59.6 0h8v40h-8V0z" fill="#ccc" transform="rotate(120 64 64)"/>
            <path
                d="M59.6 0h8v40h-8V0z"
                fill="#b2b2b2"
                transform="rotate(150 64 64)"
            />
            <path d="M59.6 0h8v40h-8V0z" fill="#999" transform="rotate(180 64 64)"/>
            <path
                d="M59.6 0h8v40h-8V0z"
                fill="#7f7f7f"
                transform="rotate(210 64 64)"
            />
            <path d="M59.6 0h8v40h-8V0z" fill="#666" transform="rotate(240 64 64)"/>
            <path
                d="M59.6 0h8v40h-8V0z"
                fill="#4c4c4c"
                transform="rotate(270 64 64)"
            />
            <path d="M59.6 0h8v40h-8V0z" fill="#333" transform="rotate(300 64 64)"/>
            <path
                d="M59.6 0h8v40h-8V0z"
                fill="#191919"
                transform="rotate(330 64 64)"
            />
            <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64"
                calcMode="discrete"
                dur="1000ms"
                repeatCount="indefinite"
            ></animateTransform>
        </g>
    </svg>
);

export const NoiseSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
            <filter
                id="a"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
                filterUnits="objectBoundingBox"
                primitiveUnits="userSpaceOnUse"
                colorInterpolationFilters="linearRGB"
            >
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency={0.102}
                    numOctaves={4}
                    seed={15}
                    stitchTiles="stitch"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    result="turbulence"
                />
                <feSpecularLighting
                    surfaceScale={15}
                    specularConstant={0.75}
                    specularExponent={20}
                    lightingColor="hsl(22.5, 100%, 33%)"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    in="turbulence"
                    result="specularLighting"
                >
                    <feDistantLight azimuth={3} elevation={100}/>
                </feSpecularLighting>
            </filter>
        </defs>
        <path fill="hsl(22.5, 40%, 98%)" d="M0 0h700v700H0z"/>
        <path fill="hsl(22.5, 100%, 33%)" filter="url(#a)" d="M0 0h700v700H0z"/>
    </svg>
);
