'use server';

import { z } from 'zod';

// オブジェクト生成時のスキーマ
const FormSchema = z.object({
  title: z.string(),
  envTag: z.string(),
  tagsComponent: z.array(z.string()),
  dateTime: z.date(),
})

