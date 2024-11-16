import React, {useEffect, useState} from "react";
import {initDB} from "../../../service";
import {Infringing} from "../../../type";
import {Link} from "react-router-dom";

const Page=()=>{

    const [recordList, setRecordList] = useState<Infringing.InfringingResponse[]>([])

    const getRecordList= async ()=>{
        const { _, idbRcd } = await initDB();
        try {
            const res = await idbRcd.getAll()
            setRecordList(res)
        } catch (err){
            throw new Error(err.message)
        }
    }

    const onDelete=async (id: number)=>{
        const { _, idbRcd } = await initDB();
        try {
            await idbRcd.delete(id)
            getRecordList()
        } catch (err){
            throw new Error(err.message)
        }
    }

    useEffect(()=>{
        getRecordList()
    }, [])

    if(recordList.length === 0) return <div className="flex justify-center items-center h-full text-xl">No data</div>

    return <div className="shadow-lg mt-4">
        {
            recordList.map(record=>{
                return <div className="flex items-center py-4 px-8 shadow-sm" key={record.analysis_id}>
                    <Link
                        to={`/record/${record.analysis_id}`}
                        className="flex-1 justify-items-start mr-4"
                    >
                        <>
                            <div>
                                {record.patent_id} : {record.company_name}
                            </div>
                            <div className="text-sm text-gray-400">
                                Analysis date: {record.analysis_date}
                            </div>
                        </>
                    </Link>
                    <div>
                        <button
                            onClick={()=>onDelete(record.analysis_id)}
                        >🗑</button>
                    </div>
                </div>
            })
        }
    </div>
}

export default Page

