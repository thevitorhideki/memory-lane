"use client";

import "./widget.css";
interface WidgetProps {
    spanx: number;
    spany: number;
    children?: React.ReactNode;
    title?: string;
    description?: string;

}
export default function Widget({ spanx, spany, children, title, description }: WidgetProps) {

    return (
        <div className="widget" style={{
            gridColumn: "span " + spanx,
            gridRow: "span " + spany,
        }}>

            <div className="widget-header">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>



            {children}



        </div>
    );
}
