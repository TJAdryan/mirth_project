// Step 1: Create an empty JSON object.
var fhirPatientResource = {};

// Step 2: Populate the object with data from 'msg'.
fhirPatientResource.resourceType = "Patient";
fhirPatientResource.id = msg['PID']['PID.3']['PID.3.1'].toString();
// ...and so on for all fields...

// Step 3: Assign the completed JSON object to the 'tmp' variable.
tmp = fhirPatientResource;