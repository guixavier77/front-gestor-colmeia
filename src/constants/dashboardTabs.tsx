import AutoGraphIcon from '@mui/icons-material/AutoGraph'
import GroupIcon from '@mui/icons-material/Group'
import MapIcon from '@mui/icons-material/Map'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

export const TABS_DASH = {
  DASH: 'dash',
  APICULTORES: 'apicultores',
  MAPA: 'mapa',
  GESTORES: 'gestores',
}

export const dashboardTabs = [
  {
    name: 'Estatísticas',
    icon: <AutoGraphIcon />,
    value: TABS_DASH.DASH,
  },
  {
    name: 'Gestores',
    icon: <AdminPanelSettingsIcon />,
    value: TABS_DASH.GESTORES,
    hide: ['admin'],
  },
  {
    name: 'Apicultores',
    icon: <GroupIcon />,
    value: TABS_DASH.APICULTORES,
  },
  {
    name: 'Mapa',
    icon: <MapIcon />,
    value: TABS_DASH.MAPA,
  },
]
