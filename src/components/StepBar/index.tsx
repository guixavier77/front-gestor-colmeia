import BusinessIcon from '@mui/icons-material/Business'
import StoreIcon from '@mui/icons-material/Store'
import Stack from '@mui/material/Stack'
import Step from '@mui/material/Step'
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import { styled } from '@mui/material/styles'
import * as React from 'react'

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(95deg, #FFE500 0%, #D4B200 50%, #1D1D1D 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(95deg, #FFE500 0%, #D4B200 50%, #1D1D1D 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
    ...theme.applyStyles?.('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}))

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean }
}>(({ theme }) => ({
  backgroundColor: '#6D6D6D',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundImage:
          'linear-gradient( 136deg, #FFCB08 0%, #FFCB08 50%, #1D1D1D 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundImage:
          'linear-gradient( 136deg, #FFCB08 0%, #FFCB08 50%, #1D1D1D 100%)',
      },
    },
  ],
}))

function ColorlibStepIcon(
  props: StepIconProps & {
    icons: { [index: string]: React.ReactElement<any> }
  },
) {
  const { active, completed, className, icons } = props

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}

export default function CustomizedSteppers({
  steps,
  activeTab,
  iconStep1,
  iconStep2,
}: any) {
  const icons = {
    1: iconStep1,
    2: iconStep2,
  }
  return (
    <Stack>
      <Stepper
        alternativeLabel
        activeStep={activeTab}
        connector={<ColorlibConnector />}
      >
        {steps.map((label: any) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={(props) => (
                <ColorlibStepIcon {...props} icons={icons} />
              )}
            >
              <p className="font-bold text-base">{label}</p>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  )
}
