import React, { useEffect, useState } from "react";
import ReactFlow, {
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

function TreeVisualizer({ data, searchPath }) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [message, setMessage] = useState("");
    const { setCenter } = useReactFlow();

    const createTree = (obj, parentId = null, depth = 0, xOffset = 0, prefix = "$") => {
        const items = [];
        let index = 0;

        for (const key in obj) {
            const value = obj[key];
            const id = `${parentId ? parentId + "-" : ""}${key}-${depth}-${index}`;
            const path = Array.isArray(obj)
                ? `${prefix}[${key}]`
                : `${prefix}.${key}`;
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
                id,
                data: { label: `${key}: ${type === "primitive" ? value : ""}`, path },
                position: { x: xOffset + index * 200, y: depth * 120 },
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
                    id: `${parentId}-${id}`,
                    source: parentId,
                    target: id,
                });
            }

            if (type !== "primitive") {
                const childItems = createTree(
                    value,
                    id,
                    depth + 1,
                    xOffset + index * 200 - 100,
                    path
                );
                items.push(...childItems);
            }

            index++;
        }

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

    return (
        <div className="w-full h-full relative bg-gray-100 rounded-md">
            {message && (
                <div className="absolute top-2 left-2 bg-white px-3 py-1 text-sm rounded shadow">
                    {message}
                </div>
            )}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default TreeVisualizer;
