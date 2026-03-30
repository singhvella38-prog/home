// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Vercel 설정창에 넣은 그 "이름"들을 여기서 불러옵니다.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 이 명령어가 있어야 다른 파일(NoticeBoard)에서 supabase를 쓸 수 있습니다.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
