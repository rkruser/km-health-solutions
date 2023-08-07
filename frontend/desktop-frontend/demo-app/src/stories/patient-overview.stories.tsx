import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import PatientOverview from '../react-components/patient-overview';
import PatientContext from '../react-components/patient-context';

export default {
  title: 'My App/PatientOverview',
  component: PatientOverview,
  decorators: [
    (Story) => (
        <PatientContext.Provider value={{ 
            selectedPatient : {"info": {"name": "John Doe", "dob": "01/01/1970", "description": "A patient with a name and a date of birth."}, "summary":"here is a summary"},
            setSelectedPatient : (value: Record<string,any>) => {}, 
            selectedSearchValue : '', 
            setSelectedSearchValue : (value:string)=>{} }}>
            <Story />
        </PatientContext.Provider>
    ),
    ],
} as Meta;

const Template: StoryFn = (args) => <PatientOverview {...args} />;

export const Default = Template.bind({});
