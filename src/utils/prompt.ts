export const question_prompt=(company, patent)=> `Analyze the potential patent infringement by comparing the company 
          "${JSON.stringify(company)}" 
          and its products with the specified patent 
          "${JSON.stringify(patent)}". 
          Please return the top two findings regarding the most possible infringement, 
          infringement_likelihood is refer to the length of relevant_claims,
          specific_features in answer_format_prompt are great examples of how you defined features.`

export const answer_format_prompt=()=> `Return the results in the following JSON format:
    {
        "patent_id": "US-RE49889-E1",
        "company_name": "Walmart Inc.",
        "analysis_date": ${new Date().toLocaleDateString()},
        "top_infringing_products": [
      {
        "product_name": "product name",
        "infringement_likelihood": "High || Moderate || Low",
        "relevant_claims": ["1", "2", "3", "20", "21"],
        "explanation": "Detailed explanation of the infringement here.",
        "specific_features": [ 
          "Direct advertisement-to-list functionality", 
          "Mobile app integration", 
          "Shopping list synchronization", 
          "Digital weekly ads integration", 
          "Product data payload handling" 
        ]
      },
      {
        "product_name": "product name",
        "infringement_likelihood": "High || Moderate || Low",
        "relevant_claims": ["1", "40", "41", "42"],
        "explanation": "Detailed explanation of the infringement here.",
        "specific_features": [ 
          "Shopping list synchronization across devices", 
          "Deep linking to product lists", 
           "Advertisement integration in member benefits", 
          "Cloud-based list storage" 
          ]
      }
    ],
        "overall_risk_assessment": "High risk of infringement due to implementation of core patent claims in multiple products."
    }`