import {useState, useEffect, useRef, type ReactElement} from "react";

function Tabs({ tabs, activeTab = 0 }: { tabs: Record<string, string>[], activeTab?: number }) {
    const [selectedTab, setSelectedTab] = useState(activeTab);
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
    const containerRef = useRef(null);

    useEffect(() => {
        const container: ReactElement | null  = containerRef.current;
        if (container) {
            const tabDiv = container.children[selectedTab];
            const button = tabDiv.querySelector("button");

            setUnderlineStyle({
                left: button.offsetLeft,
                width: button.offsetWidth,
            });
        }
    }, [selectedTab, tabs]);

    return (
        <div className="w-fit mx-auto my-10 flex flex-col gap-4">
            <div ref={containerRef} className="flex w-fit border-b border-gray-200 gap-4 relative">
                {tabs.map((tab, index) => (
                    <div key={index} className="flex flex-col items-start">
                        <button
                            className="px-4 py-1 transition-colors duration-200 hover:text-blue-500 hover:cursor-pointer"
                            onClick={() => setSelectedTab(index)}
                        >
                            {tab.name}
                        </button>
                    </div>
                ))}
                <span
                    className="absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300"
                    style={{ left: underlineStyle.left, width: underlineStyle.width }}
                />
            </div>

            {tabs[selectedTab].content}
        </div>
    );
}

export default Tabs;
