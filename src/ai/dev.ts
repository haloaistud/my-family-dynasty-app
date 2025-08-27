'use server';
import {config} from 'dotenv';
config();

import '@/ai/flows/suggest-formatting.ts';
import '@/ai/flows/analyze-story.ts';
import '@/ai/flows/family-governance.ts';
import '@/ai/flows/public-records-search.ts';
