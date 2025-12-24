import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type for contact leads
export interface ContactLead {
    id?: string
    name: string
    email: string
    company?: string
    service_interest: 'Smart Contracts & Project Development' | 'Research & Innovation'
    message: string
    created_at?: string
    updated_at?: string
}

// Function to insert a new contact lead
export async function insertContactLead(lead: Omit<ContactLead, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
        .from('contact_leads')
        .insert([lead])
        .select()
        .single()

    if (error) {
        console.error('Error inserting contact lead:', error)
        throw error
    }

    return data
}

// Function to get all contact leads (admin only)
export async function getContactLeads() {
    const { data, error } = await supabase
        .from('contact_leads')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching contact leads:', error)
        throw error
    }

    return data
}
