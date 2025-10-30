import React, { useEffect, useState, useRef } from "react";
import ReactFlow, {
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { toPng } from "html-to-image";

function TreeVisualizer({ data, searchPath, darkMode }) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [message, setMessage] = useState("");
    const { setCenter } = useReactFlow();
    const flowRef = useRef(null);

    const createTree = (obj, parentId = null, depth = 0, x = 0, prefix = "$") => {
        const items = [];
        const spacingX = 220;
        const spacingY = 140;
        const keys = Array.isArray(obj) ? obj.map((_, i) => i) : Object.keys(obj);

        keys.forEach((key, index) => {
            const value = Array.isArray(obj) ? obj[index] : obj[key];
            const nodeId = `${parentId ? parentId + "-" : ""}${key}-${depth}-${index}`;
            const path = Array.isArray(obj) ? `${prefix}[${key}]` : `${prefix}.${key}`;
            const type = Array.isArray(value)
                ? "array"
                : typeof value === "object" && value !== null
                    ? "object"
                    : "primitive";

            const color =
                type === "object"
                    ? "#bfdbfe"
                    : type === "array"
                        ? "#bbf7d0"
                        : "#fde68a";


            items.push({
                id: nodeId,
                data: { label: `${key}: ${type === "primitive" ? value : ""}`, path },
                position: { x: x + index * spacingX - (keys.length * spacingX) / 2, y: depth * spacingY },
                style: {
                    background: color,
                    padding: 8,
                    borderRadius: 8,
                    fontSize: 12,
                    border: "1px solid #ccc",
                    width: 150,
                    textAlign: "center",
                },
            });


            if (parentId) {
                items.push({
                    id: `edge-${parentId}-${nodeId}`,
                    source: parentId,
                    target: nodeId,
                    animated: true,
                    style: { stroke: "#555" },
                });
            }


            if (type !== "primitive") {
                const childItems = createTree(
                    value,
                    nodeId,
                    depth + 1,
                    x + index * spacingX,
                    path
                );
                items.push(...childItems);
            }
        });

        return items;
    };



    useEffect(() => {
        if (!data) return;
        const tree = createTree(data);
        const ns = tree.filter((t) => t.data);
        const es = tree.filter((t) => t.source);
        setNodes(ns);
        setEdges(es);
        setMessage("");
    }, [data]);

    useEffect(() => {
        if (!searchPath) return;
        const match = nodes.find((n) => n.data.path === searchPath);
        if (match) {
            setNodes((nds) =>
                nds.map((n) => ({
                    ...n,
                    style: {
                        ...n.style,
                        border: n.id === match.id ? "2px solid red" : "1px solid #ccc",
                    },
                }))
            );
            setMessage("Match found");
            setCenter(match.position.x, match.position.y, { zoom: 1.5, duration: 800 });
        } else {
            setMessage("No match found");
        }
    }, [searchPath]);

    const handleDownloadImage = async () => {
        console.log("downloading image")
        if (!flowRef.current) return;
        try {
            const dataUrl = await toPng(flowRef.current, { backgroundColor: darkMode ? "#1f2937" : "#f3f4f6" });
            const link = document.createElement("a");
            link.download = "tree-visualizer.png";
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error("Error downloading tree image:", error);
        }
    };

    return (
        <div className={`w-full h-full relative rounded-md ${darkMode ? "bg-gray-800" : "bg-gray-100"}`} >
            {message && (
                <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 dark:text-white px-3 py-1 text-sm rounded shadow">
                    {message}
                </div>
            )}
            <div className="absolute top-2 right-2 z-50">

                <button
                    onClick={handleDownloadImage}
                    className=" bg-blue-500   cursor-pointer hover:bg-blue-600 text-white text-sm px-3 py-2 rounded shadow  "
                >
                    Download as Image
                </button>
            </div>

            <div ref={flowRef} className="w-full h-full">


                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    fitView
                    nodesDraggable={true}
                    nodesConnectable={false}
                    elementsSelectable={false}
                    panOnDrag={true}
                    zoomOnScroll={true}
                    zoomOnPinch={true}
                    zoomOnDoubleClick={false}
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
        </div>
    );
}

export default TreeVisualizer;
