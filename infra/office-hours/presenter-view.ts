import { defineSegment } from '@cargo-ai/cdk';
import { accounts } from './accounts.ts';

export const presenterView = defineSegment('office-hours-priorities', {
  name: 'Office hours: priorities',
  model: accounts,
  filter: { conjonction: 'and', groups: [] },
  sort: [
    { columnSlug: 'priority_rank', kind: 'asc' },
    { columnSlug: 'company', kind: 'asc' },
  ],
  columnSlugs: ['company', 'priority', 'reason', 'next_step'],
});
