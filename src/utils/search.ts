import {Company} from "../type";

export function fuzzyMatch(text: string, query: string): boolean {
    const pattern = query.toLowerCase().split('').join('.*');
    const regex = new RegExp(pattern);
    return regex.test(text.toLowerCase());
}

export function searchCompanies(companies: Company[], query: string): Company[] {
    if (!query.trim()) return [];
    return companies.filter(company => fuzzyMatch(company.name, query));
}