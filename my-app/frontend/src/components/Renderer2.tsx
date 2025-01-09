import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import { useBlog } from "../hooks";

interface Props {
    id: string;
    init: any;
    onSave: (data: any) => void;
    editorId: string; // unique ID for each editor instance
}

const EditableEditor: React.FC<Props> = ({ init, onSave, editorId, id }) => {
    const editorInstance = useRef<EditorJS | null>(null);
    

    useEffect(() => {
        const initializeEditor = () => {
            if (!editorInstance.current && document.getElementById(editorId)) {
                editorInstance.current = new EditorJS({
                    holder: editorId,
                    data: init, // Initialize with fetched content
                    autofocus: true,
                    tools: {
                        header: Header,
                        quote: Quote,
                        list: List,
                        image: ImageTool,
                    },
                });
            }
        };

        // Initialize the editor only if fetched data is available and not loading
     
            initializeEditor();
        

        // Clean up and destroy EditorJS instance on component unmount
        return () => {
            if (editorInstance.current) {
                editorInstance.current.isReady
                    .then(() => {
                        editorInstance.current?.destroy();
                        editorInstance.current = null;
                    })
                    .catch((error) => console.warn("Editor destruction error:", error));
            }
        };
    }, [editorId]); // Add fetched and loading to dependencies

    const handleSave = async () => {
        if (editorInstance.current) {
            const savedData = await editorInstance.current.save();
            onSave(savedData);
        }
    };

    return (
        <div>
            <div id={editorId}></div> {/* This must match the editorId prop */}
            <button onClick={handleSave} className="bg-red-500">Save Changes</button>
        </div>
    );
};

export default EditableEditor;
