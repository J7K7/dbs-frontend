import Tab from "@/components/layout/Tab";


export default function Layout({
    children,
    params,
    modal,
}: {
    children: React.ReactNode;
    params: {
        productId: string;
    };
    modal : React.ReactNode;
}
) {
    const tabs = [
        { label: 'Details', href: `/product/${params.productId}/details`, isDisabled: false },
        { label: 'Features', href: `/product/${params.productId}/features`, isDisabled: false },
        { label: 'Images', href: `/product/${params.productId}/images`, isDisabled: false },
        { label: 'Slots', href: `/product/${params.productId}/slots`, isDisabled: false },
    ];
    // console.log("layout called")
    return (
        <div>
            <Tab tabs={tabs} />
            {modal}
            {children}
        </div>
    );
}