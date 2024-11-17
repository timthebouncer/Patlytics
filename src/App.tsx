import {FC, useEffect, useState, useCallback} from 'react';
import { PatentComparisonForm } from './components/PatentComparisonForm';
import {PatentInfringementAnalyzer} from './components/PatentInfringementAnalyzer';
import OpenAI from "openai";
import {initDB} from "./service";
import {Company, Infringing, Patent} from "./type";
import {answer_format_prompt, question_prompt} from "./utils/prompt";

const client = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true
})

const App:FC=()=> {
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [patentList, setPatentList] = useState<Patent[]>([]);
  const [result, setResult] = useState<Infringing.InfringingResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)

  const handleAnalyze = useCallback(
      async ({ patentId, companyName }: { patentId: string; companyName: string }):Promise<{ patentId: string; companyName: string }> => {

        try {
          setIsAnalyzing(true)
          const patent = patentList.filter((patent) => patent.publication_number === patentId);
          const company = companyList.filter((company) => company.name === companyName);

          if (patent.length === 0 && company.length === 0) {
            throw new Error("Not match");
          }

          const completion = await client.chat.completions.create({
            messages: [
              {
                role: 'user',
                content: `This is a task ${question_prompt(company, patent)}, ${answer_format_prompt()}.
            Replace the product names, analysis_date, infringement likelihoods, relevant claims, explanations, and specific features with the actual details based on the analysis of the company and patent provided.`,
              },
            ],
            model: 'gpt-3.5-turbo',
          });

          const parseContent = JSON.parse(completion.choices[0].message.content);

          setResult(parseContent);

          const { idbRcd } = await initDB();
          await idbRcd.set(parseContent);
        } catch (err) {
          if (err instanceof OpenAI.RateLimitError) {
            console.error("Rate limit exceeded");
          } else {
            console.error(err.message);
          }
        } finally {
          setIsAnalyzing(false)
        }
      },
      [patentList, companyList]
  );

  const getCompanies=()=>{
    fetch('../../public/company_products.json')
        .then(response => response.json() as unknown as Record<string, []>)
        .then(data =>{
          setCompanyList(data.companies)
        })
        .catch(error => console.error('Error fetching public:', error));
  }

  const getPatentList=()=>{
    fetch('../../public/patents.json')
        .then(response => response.json() as unknown as Patent[])
        .then(data =>{
          setPatentList(data)
        })
        .catch(error => console.error('Error fetching public:', error));
  }

  useEffect(() => {
    getCompanies()
    getPatentList()
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <PatentComparisonForm
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
      />
      {result !== null && (
        <>
          <PatentInfringementAnalyzer
              result={result}
          />
        </>
      )}
    </div>
  );
}

export default App