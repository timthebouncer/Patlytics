import React, {FC} from 'react';
import {Infringing} from "../type";

interface Props extends Infringing.InfringingResponse{}

const PatentInfringementAnalyzer=({result}:{result: Props})=> {
  return (
      <div className="max-w-4xl mx-auto">
          <div className="font-bold mb-4">
              {result.patent_id} : {result.company_name}
          </div>
        {result.top_infringing_products.map((item, index) => (
            <div key={index} className="mb-8 p-6 border rounded-lg bg-white shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{item.product_name}</h3>

              <div className="mb-4">
                <h4 className="mb-2 font-bold">Infringement Likelihood:</h4>
                {item.infringement_likelihood}
              </div>

              <div className="mb-4">
                <h4 className="font-bold">Relevant Claims：</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.relevant_claims.map(claim => (
                      <div key={claim} className="group relative">
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded">
                          Claim {claim}
                        </span>
                      </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="mb-2 font-bold">Specific Features:</h4>
                <ul className="flex flex-col">
                  {
                    item.specific_features.map((feature, index) => {
                      return <li key={feature}>{index + 1}. {feature}</li>
                    })
                  }
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-bold">Explanation:</h4>
                {item.explanation}
              </div>
            </div>
        ))}
      </div>
  );
}

export {PatentInfringementAnalyzer};