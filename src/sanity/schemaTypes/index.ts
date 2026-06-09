import { type SchemaTypeDefinition } from 'sanity'

import { story } from './story'
import { news } from './news'
// import { memorial } from './memorial' // Old memorial schema replaced
import { campaign } from './campaign'
import { research } from './research'
import { event } from './event'
import { resource } from './resource'
import { templateCategory } from './templateCategory'
import { letterTemplate } from './letterTemplate'
import { letterHistory } from './letterHistory'
import { memorial } from './memorial'
import { timelineEvent } from './timelineEvent'
import { achievement } from './achievement'
import { tribute } from './tribute'
import { candleLog } from './candleLog'
import { memory } from './memory'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [story, news, campaign, research, event, resource, templateCategory, letterTemplate, letterHistory, memorial, timelineEvent, achievement, tribute, candleLog, memory],
}
