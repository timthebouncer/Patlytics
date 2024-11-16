import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {initDB} from "../../../service";
import {PatentInfringementAnalyzer} from "../../../components/PatentInfringementAnalyzer";
import {Infringing} from "../../../type";

const Page=()=>{

    const {recordId} = useParams()
    const [record, setRecord] = useState<Infringing.InfringingResponse | null>(null)
    const onGetRecord=async ()=>{
        const { _, idbRcd } = await initDB();
        try {
            const res = await idbRcd.get(Number(recordId))
            setRecord(res)
        } catch (err){
            throw new Error(err.message)
        }
    }

    useEffect(()=>{
        onGetRecord()
    }, [])

    if(record === null) return <div className="flex justify-center items-center h-full text-xl">No data</div>

    return <>
        <PatentInfringementAnalyzer
            result={record}
        />
    </>
}

export default Page