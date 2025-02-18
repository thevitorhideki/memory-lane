"use client";

import React, { useEffect, useState } from "react";
import "./widget.css";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
} from "recharts";
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
