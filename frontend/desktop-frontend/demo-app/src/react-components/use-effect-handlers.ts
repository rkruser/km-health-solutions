/*
import { useEffect } from "react";


function useSearchValueToPatientValueEffect(selectedSearchValue:string, setSelectedPatient:(currentPatient:Record<string,any>)=>void) {
  useEffect(() => {
    setSelectedPatient( currentPatient => ({...currentPatient, "summary": selectedSearchValue, "orders":selectedSearchValue+"dfasdf", "recommendations":selectedSearchValue+"skarskarskarskar"}) );
  },
  [selectedSearchValue]
  );
}
*/