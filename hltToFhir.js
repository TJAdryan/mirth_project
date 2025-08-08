// Create a new JavaScript object to hold the FHIR Patient resource.
// It's a good practice to start with a skeleton of the resource structure.
var fhirPatientResource = {
    "resourceType": "Patient",
    "identifier": [],
    "name": [],
    "gender": "",
    "birthDate": ""
};

// --- MAPPING LOGIC ---

// Map HL7 PID-3 (Patient ID) to FHIR identifier
// We check if the field exists to prevent errors.
if (msg['PID']['PID.3']['PID.3.1']) {
    // Create an identifier object as required by the FHIR specification
    var identifierObject = {
        "use": "usual",
        "type": {
            "coding": [{
                "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                "code": "MR" // Medical Record Number
            }]
        },
        "system": "http://your-ehr-system.com/fhir/patient-id",
        "value": msg['PID']['PID.3']['PID.3.1'].toString()
    };
    fhirPatientResource.identifier.push(identifierObject);
}

// Map HL7 PID-5 (Patient Name) to FHIR name
if (msg['PID']['PID.5']['PID.5.1'] && msg['PID']['PID.5']['PID.5.2']) {
    var nameObject = {
        "family": msg['PID']['PID.5']['PID.5.1'].toString(),
        "given": [msg['PID']['PID.5']['PID.5.2'].toString()],
        "use": "official"
    };
    fhirPatientResource.name.push(nameObject);
}

// Map HL7 PID-8 (Gender) to FHIR gender
if (msg['PID']['PID.8']) {
    var hl7Gender = msg['PID']['PID.8'].toString().toUpperCase();
    if (hl7Gender === 'M') {
        fhirPatientResource.gender = 'male';
    } else if (hl7Gender === 'F') {
        fhirPatientResource.gender = 'female';
    } else {
        fhirPatientResource.gender = 'unknown'; // FHIR allows 'unknown' and 'other'
    }
}

// Map HL7 PID-7 (Date of Birth) to FHIR birthDate
if (msg['PID']['PID.7']['PID.7.1']) {
    var dob = msg['PID']['PID.7']['PID.7.1'].toString();
    // Convert YYYYMMDD to YYYY-MM-DD
    if (dob.length >= 8) {
        fhirPatientResource.birthDate = dob.substring(0, 4) + '-' + dob.substring(4, 6) + '-' + dob.substring(6, 8);
    }
}

// Set the final transformed object to the Mirth 'tmp' variable.
// This is what the destination will receive.
tmp = fhirPatientResource;