"use client";

import React, { useEffect, useState } from "react";
import "./page.css";
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
export default function Widget({ spanx, spany, children, title, description}: WidgetProps) {



    return (
        <div className="widget widget-1" style={{
            gridColumn: "span " + spanx,
            gridRow: "span " + spany,

        }}>
            <div className="widget-header"
                style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "left",
                        textAlign: "left",     
                        paddingLeft: "20px",       
                }}
            >
                <h2
                    style={{
                        fontSize: "20px",
                        color: "rgb(200, 200, 200)",
                        lineHeight: "1.5",
                        margin: "0 0 20px",
                        textAlign: "left"
                    }}
                >{title}</h2>
                <p style={
                    {fontSize: "14px",
                    color: "#777",
                    lineHeight: "1.5",
                    margin: "0 0 20px",
                    textAlign: "left"}
                }>{description}</p>
            </div>

           {children}
        </div>
    );
}
