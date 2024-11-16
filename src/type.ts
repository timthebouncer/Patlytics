enum InfringementLikelihood {
    High = "High",
    Moderate = "Moderate",
    Low = "Low",
}

export namespace Infringing {
    export type InfringingResponse={
        analysis_id: number
        patent_id: string
        company_name: string
        analysis_date: string
        top_infringing_products: top_infringing_products_Item[]
        "overall_risk_assessment": string
    }

    export type top_infringing_products_Item={
        "product_name": string,
        "infringement_likelihood": InfringementLikelihood,
        "relevant_claims": string[],
        "explanation": string,
        "specific_features": string[]
    }

}

export type Company={
    name: string;
    products: string[];
}
export type Patent={
    "id": number,
    "publication_number": string,
    "title": string,
    "ai_summary": string,
    "raw_source_url": string,
    "assignee": string,
    "inventors": string,
    "priority_date": string,
    "application_date": string,
    "grant_date": string,
    "abstract": string,
    "description": string,
    "claims": string,
    "jurisdictions": string,
    "classifications": string,
    "application_events": string,
    "citations": string,
    "image_urls": string[],
    "landscapes": string,
    "created_at": string,
    "updated_at": string,
    "publish_date": string,
    "citations_non_patent": string,
    "provenance": string,
    "attachment_urls": never
}

