// inpatients

exports.insertInpatiens =  `
    INSERT INTO inpatient
    (
        inpatient_id, 
        firstname,
        middlename,
        lastname,
        mobilenumber, 
        gender ,
        address1, 
        address2, 
        state, city, 
        zipcode, 
        birthplace, 
        birthday, 
        bloodtype)
    VALUES 
    (DEFAULT, $1,$2,$3,$4,$5,$6,$7,
        $8,$9, $10, $11, $12,$13);`

exports.insertInpatiensValue = (param)=>{
    let arrayInsertPatients = [
        param.firstname,param.middlename,param.lastname,param.mobilenumber,param.gender,param.address1,param.address2,
        param.state,param.city, param.zipcode, param.birthplace, param.birthday,param.bloodtype
    ]
    return arrayInsertPatients
}

exports.updateInpatient = `
    UPDATE inpatient
    SET firstname = $1,
        middlename =  $2,
        lastname =  $3,
        mobilenumber =  $4,
        gender =  $5,
        address1 =  $6,
        address2 =  $7,
        state =  $8,
        city =   $9,
        zipcode =  $,10
        birthplace =  $11,
        birthday = $12,
        bloodtype =   $13 
    WHERE
        inpatient_id = $14
        `

exports.updateInpatientValue = (param,id)=>{
    let arrayUpdateInpatient = [
        param.firstname,param.middlename, param.lastname, param.mobilenumber,param.gender,param.address1,
        param.address2,param.state,param.city,param.zipcode,param.birthplace,param.birthday,param.bloodtype,
        id
    ]
    return arrayUpdateInpatient
}


// doctors
exports.insertDoctors =  `
    INSERT INTO doctor
    (doctor_id, firstname,middlename,lastname,mobilenumber, gender ,address1, address2, state, city, zipcode, birthplace, birthday, 
        nik, specialization ,certificate, datecertification, countpatientnumber)
    VALUES 
    (DEFAULT, $1,$2,$3,$4,$5,$6,$7,
        $8,$9, $10, $11, $12,
        $13, $14,$15,$16, $17);`


exports.insertDoctorsValue = (param)=>{
    let arrayInsertDoctors = [
        param.firstname,param.middlename,param.lastname,param.mobilenumber,param.gender,param.address1,param.address2,
        param.state,param.city,param.zipcode,param.birthplace,param.birthday,param.nik,param.specialization,param.certificate,
        param.datecertification,param.countpatientnumber
    ]
    return arrayInsertDoctors
}

exports.updateDoctor = `UPDATE doctor
    SET firstname = $1,
        middlename = $2,
        lastname = $3,
        mobilenumber = $4,
        gender = $5,
        address1 = $6,
        address2 = $7,
        state = $8,
        city = $9,
        zipcode = $10,
        birthplace = $11,
        birthday = $12,
        nik = $13,
        specialization = $14,
        certificate = $15,
        datecertification = $16,
        countpatientnumber = $17,
    WHERE
        doctor_id = $18'`

exports.updateDoctorValue = (param,id)=>{
    let arrayUpdateDoctor = [
        param.firstname,param.middlename,param.lastname,param.mobilenumber,param.gender,param.address1,param.address2,
        param.state,param.city,param.zipcode,param.birthplace,param.birthday,param.nik,param.specialization,param.certificate,
        param.datecertification,param.countpatientnumber,id
    ]
    return arrayUpdateDoctor
}

// medicalRecords

exports.insertMedicalRecord = `
    WITH i AS (
        INSERT INTO medicalrecord
        (medicalrecord_id, inpatient_id, doctor_id, consultdate, bloodpressure, bpmnumber ,pupil, temperature, polyclinic)
        VALUES 
        (DEFAULT, $1,$2,$3, $4,
        $5, $6, $7,$8)
        RETURNING *
      )
    UPDATE doctor AS a
      SET countpatientnumber = countpatientnumber + 1
      FROM i
      WHERE i.doctor_id = a.doctor_id
      RETURNING i, countpatientnumber, firstname, middlename, lastname
      `

exports.insertMedicalRecordValue = (param)=>{
    let arrayInsertMedicalRecord = [
        param.inpatient_id,param.doctor_id,param.consultdate,param.bloodpressure,param.bpmnumber,
        param.pupil,param.temperature,param.polyclinic
    ]
    return arrayInsertMedicalRecord
}

exports.removeMedicalRecords = `
    WITH u AS (
        UPDATE doctor 
        SET countpatientnumber = countpatientnumber - 1
        WHERE 
            doctor.doctor_id = (SELECT doctor_id FROM medicalrecord WHERE medicalrecord_id = $1) 
        RETURNING *
    )
    DELETE from medicalrecord WHERE medicalrecord_id = $2
    RETURNING *
    `
    // return `
    // UPDATE doctor 
    // SET countpatientnumber = countpatientnumber - 1
    // FROM
    //     (SELECT doctor_id FROM medicalrecord WHERE medicalrecord_id = ${param} ) as m
    // WHERE 
    //     doctor.doctor_id = m.doctor_id
    // `

exports.queryMedicalRecordDateRange = 
    `
        WITH u AS(
            SELECT *
                FROM medicalrecord 
                LEFT OUTER JOIN inpatient
                ON medicalrecord.inpatient_id = inpatient.inpatient_id
            WHERE 
                consultdate 
            BETWEEN $1 AND $2
        )
        SELECT polyclinic,
            COUNT(*) OVER(),
            SUM(CASE WHEN bloodtype = 'O' then 1 else 0 end )OVER() AS bloodtype_O,
            SUM(CASE WHEN bloodtype = 'A' then 1 else 0 end )OVER() AS bloodtype_A,
            SUM(CASE WHEN bloodtype = 'B' then 1 else 0 end )OVER() AS bloodtype_B,
            SUM(CASE WHEN bloodtype = 'AB' then 1 else 0 end )OVER() AS bloodtype_AB
        FROM u
    `


exports.queryMedicalRecordDateRangeValue = (param)=>{
    return[
        param.dateFrom, param.dateTo
    ]
}


exports.queryMedicalRecordDateRangePolyclinic = 
    `
    WITH u AS(
        SELECT * 
            FROM medicalrecord 
            LEFT OUTER JOIN inpatient
            ON medicalrecord.inpatient_id = inpatient.inpatient_id
        WHERE 
            polyclinic = $1
        AND 
            consultdate BETWEEN $2 AND $3
    )
    SELECT polyclinic,
        COUNT(*) OVER(),
        SUM(CASE WHEN bloodtype = 'O' then 1 else 0 end )OVER() AS bloodtype_O,
        SUM(CASE WHEN bloodtype = 'A' then 1 else 0 end )OVER() AS bloodtype_A,
        SUM(CASE WHEN bloodtype = 'B' then 1 else 0 end )OVER() AS bloodtype_B,
        SUM(CASE WHEN bloodtype = 'AB' then 1 else 0 end )OVER() AS bloodtype_AB
    FROM u 
    `


exports.queryMedicalRecordDateRangePolyclinicValue = (param)=>{
    return[
        param.polyclinic, param.dateFrom, param.dateTo
    ]
}