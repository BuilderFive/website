export type Route = {
    name: string;
    key: string;
    path: string;
    dropdown?: DropdownContent[];
}

export type DropdownContent = {
    name: string;
    key: string;
    description: string;
    icon?: JSX.Element;
    path: string;
    newTab?: boolean;
}

export type MobileRouteSection = {
    title: string;
    routes: MobileRoute[];
}

export type MobileRoute = {
    name: string;
    key: string;
    path: string;
}

export const MobileRoutes: MobileRouteSection[] = [
    {
        title: 'Navigation',
        routes: [
            {
                name: 'home',
                key: 'home',
                path: '#'
            },
            {
                name: 'pricing (wip)',
                key: 'pricing',
                path: '/'
            },
            {
                name: 'about (wip)',
                key: 'about',
                path: '/about'
            }
        ]
    }
] 

export const Routes: Route[] = [
    {
        name: 'home',
        key: 'home',
        path: '/'
    },
    {
        name: 'pricing (wip)',
        key: 'pricing',
        path: '/'
    },
    {
        name: 'about (wip)',
        key: 'about',
        path: '/about'
    }
]