import { createUploadPanel } from './panels/uploadPanel.js';
import { createDataPanel } from './panels/dataPanel.js';
import { createToolsPanel } from './panels/toolsPanel.js';

function toSentenceCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const panels = [
  {
    side: 'left',
    id: 'upload',
    icon: `<img src="/images/icons/upload.svg" alt="Upload" style="width:24px;height:24px;vertical-align:middle;">`,
    panelContent: createUploadPanel,
    title: toSentenceCase('upload')
  },
  {
    side: 'left',
    id: 'data',
    icon: `<img src="/images/icons/layers.svg" alt="Data" style="width:24px;height:24px;vertical-align:middle;">`,
    panelContent: createDataPanel,
    title: toSentenceCase('data')
  },
  {
    side: 'left',
    id: 'tools',
    icon: `<img src="/images/icons/wrench.svg" alt="Tools" style="width:24px;height:24px;vertical-align:middle;">`,
    panelContent: createToolsPanel,
    title: toSentenceCase('tools')
  },
  {
    side: 'left',
    id: 'settings',
    icon: `<img src="/images/icons/cog.svg" alt="Tools" style="width:24px;height:24px;vertical-align:middle;">`,
    panelContent: 'Left Settings panel content',
    title: toSentenceCase('settings')
  },
  {
    side: 'right',
    id: 'help',
    icon: '❓',
    panelContent: 'Right Help panel content',
    title: toSentenceCase('help')
  },
  {
    side: 'right',
    id: 'about',
    icon: '🛈',
    panelContent: 'Right About panel content',
    title: toSentenceCase('about')
  }
];