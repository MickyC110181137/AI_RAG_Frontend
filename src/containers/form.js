import axios from "axios";
import { useState } from "react";

export default function Search() {
    const [response, setResponse] = useState("");
    const [value, setValue] = useState("");

    const callLLM = async (data) => {
        try {
          const res = await axios({
            method: "post",
            url: "http://127.0.0.1:8080/chatLLM",
            headers: {
              "Content-Type": "application/json",
            },
            data:{question: data},
          });
          return res.data; // 回傳結果
        } catch (error) {
          console.error("API 呼叫失敗：", error);
          return "Error occurred";
        }
    };

    const search = async () => {
    
        // 呼叫 API 並更新結果
        try {
          const result = await callLLM(value);
          const {llmAnwser} = result
          setResponse(llmAnwser[0]); // 更新結果至狀態
        } catch (error) {
          setResponse("Error retrieving response");
        }
    };
    
    return (
        <div className="main">
            <h1>建構基於 LLM 的 AI 小幫手優化海事證照培訓</h1>
            <form  action={search}>
                <div className="container">
                    <div className="entryarea">
                        <input value={value} name="query" onChange={e=>{
                            setValue(e.target.value)
                            console.log(value);
                            
                        }}/>
                        <div className="labelline">enter your question</div>
                    </div>                    
                </div>                
                <button type="submit">送出</button>
            </form>
            <pre className="aaa">{response}</pre>
        </div>
    );
}



