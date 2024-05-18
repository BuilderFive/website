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
        title: '<todo>',
        routes: [
            {
                name: '<todo>',
                key: 'todo',
                path: '#'
            },
        ]
    }
] 

export const Routes: Route[] = [
    {
        name: 'Home',
        key: 'home',
        path: '/'
    },
    {
        name: 'Pricing',
        key: 'pricing',
        path: '/pricing'
    },
    {
        name: 'About',
        key: 'about',
        path: '/about'
    },
    {
        name: 'Contact',
        key: 'contact',
        path: '/contact'
    }
]