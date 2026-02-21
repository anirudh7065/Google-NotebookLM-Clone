"use client"
<<<<<<< HEAD
import { useRef, useState } from "react";
=======
import { useRef } from "react";
>>>>>>> 3909b27 (Initial Commit)
import { useRouter } from "next/navigation";
import Image from "next/image";

const UploadBox = () => {
    const router = useRouter();
    const FileRef = useRef<HTMLInputElement>(null);
    const clicked = useRef<boolean>(false);
<<<<<<< HEAD
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const handleClick = () => {
        if (clicked.current) return;
        clicked.current = true;

        FileRef.current?.click();

        // Unlock after 500ms (or after dialog closes, if needed)
        setTimeout(() => {
            clicked.current = false;
        }, 500);
    }
    const handleCHange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setLoading(true);
            if (file.type !== "application/pdf") {
                setError("Only PDF files are allowed.");
                setLoading(false);
                return;
            }
            setError("");

=======
    const handleClick = () => {
            if (clicked.current) return;
            clicked.current = true;

            console.log("clicked");
            FileRef.current?.click();

            // Unlock after 500ms (or after dialog closes, if needed)
            setTimeout(() => {
                clicked.current = false;
            }, 500);
    }
    const handleCHange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
>>>>>>> 3909b27 (Initial Commit)
            const form = new FormData();

            form.append("File", file);

<<<<<<< HEAD
            const res = await fetch("/api/upload", {
=======
            const res = await  fetch("/api/upload", {
>>>>>>> 3909b27 (Initial Commit)
                method: "POST",
                body: form
            })

<<<<<<< HEAD
            if (res.ok) {
                setLoading(false);
                router.push("/chat")
            } else {
                setError("something went wrong")
            }

        }
    }
    return (
        <main className='md:w-100 md:h-62.5 bg-[#fffefe] shadow-lg rounded-2xl p-10 md:p-4 flex flex-col justify-center items-center ' onClick={handleClick}>
            {loading && <div className="flex justify-center items-center h-screen w-full">
                <div className="w-24 h-24 border-4 border-gray-300 border-t-purple-900 rounded-full animate-spin"></div>
            </div>}
            {
                !loading && <>
                    <Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA7UlEQVR4nO3W3QqCQBCG4fcqWun+ryRP6qiC6OdqJoQJllCz2GBGvheWhGidJ0uE/7fxlboOuPoajlNWgAtgvh7AluQIy4jpgJsP/nqtj28ZfmaluhJ3//ZfkE31XugrU0YQVBAyYMoE4h0SGlNmEGOQsJjzhz/xGOT9pnAiQAfgOHMnmoLgnxkQexJkM5BUmSDBEqRltnD1C/aYqv/iPD+39AS7BXuEgKTfwyIMgSDBhkCQYEMgSLAhECTYEAgSbAgECTYEQSD9h8f8NJAWmSCeII0zQTxBGmeCeII0zgTxBGmcCbJWiAVZrB7yBEinVIVHyL3uAAAAAElFTkSuQmCC" alt="upload--v1" width={50} height={50} className="w-10 my-4" />
                    <h1 className='text-xl font-extrabold'>Upload PDF to start chatting</h1>
                    <h3 className='text-lg text-gray-500'>click or drag and drop your file here</h3>
                    <input type="file" accept="application/pdf" name="File" id="File" ref={FileRef} onChange={handleCHange} className='hidden' />
                    {error && <p className="text-red-500">{error}</p>}
                </>
            }
        </main>
=======
            if(res.ok) {
                router.push("/chat")
            }else{
                alert("something went wrong")
            }

            
        }
    }
    return (
        <main className='md:w-[400px] md:h-[250px] bg-[#fffefe] shadow-lg rounded-2xl p-10 md:p-4 flex flex-col justify-center items-center ' onClick={handleClick}>
            <Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA7UlEQVR4nO3W3QqCQBCG4fcqWun+ryRP6qiC6OdqJoQJllCz2GBGvheWhGidJ0uE/7fxlboOuPoajlNWgAtgvh7AluQIy4jpgJsP/nqtj28ZfmaluhJ3//ZfkE31XugrU0YQVBAyYMoE4h0SGlNmEGOQsJjzhz/xGOT9pnAiQAfgOHMnmoLgnxkQexJkM5BUmSDBEqRltnD1C/aYqv/iPD+39AS7BXuEgKTfwyIMgSDBhkCQYEMgSLAhECTYEAgSbAgECTYEQSD9h8f8NJAWmSCeII0zQTxBGmeCeII0zgTxBGmcCbJWiAVZrB7yBEinVIVHyL3uAAAAAElFTkSuQmCC" alt="upload--v1" width={50} height={50} className="w-[40px] my-4" />
            <h1 className='text-xl font-extrabold'>Upload PDF to start chatting</h1>
            <h3 className='text-lg text-gray-500'>click or drag and drop your file here</h3>
            <input type="file" accept=".pdf" name="File" id="File" ref={FileRef} onChange={handleCHange} className='hidden' />
            </main>
>>>>>>> 3909b27 (Initial Commit)
    )
}

export default UploadBox