// inpatients

exports.insertInpatiens = (param)=>{
    return `
    INSERT INTO inpatient
    (inpatient_id, firstname,middlename,lastname,mobilenumber, gender ,address1, address2, state, city, zipcode, birthplace, birthday, bloodtype)
    VALUES 
    (DEFAULT, '${param.firstname}','${param.middlename}','${param.lastname}','${param.mobilenumber}','${param.gender}','${param.address1}','${param.address2}',
        '${param.state}','${param.city}', '${param.zipcode}', '${param.birthplace}', '${param.birthday}','${param.bloodtype}');`
}

exports.updateInpatient = (param,id)=>{
    return`
    UPDATE inpatient
    SET firstname = '${param.firstname}' ,
        middlename =  '${param.middlename}',
        lastname =  '${param.lastname}',
        mobilenumber =  '${param.mobilenumber}',
        gender =  '${param.gender}',
        address1 =  '${param.address1}',
        address2 =  '${param.address2}',
        state =  '${param.state}',
        city =   '${param.city}',
        zipcode =  '${param.zipcode}',
        birthplace =  '${param.birthplace}',
        birthday = '${param.birthday}',
        bloodtype =   '${param.bloodtype}' 
    WHERE
        inpatient_id = ${id}
        `
}





// doctors
exports.insertDoctors = (param)=>{
    return `
    INSERT INTO doctor
    (doctor_id, firstname,middlename,lastname,mobilenumber, gender ,address1, address2, state, city, zipcode, birthplace, birthday, 
        nik, specialization ,certificate, datecertification, countpatientnumber)
    VALUES 
    (DEFAULT, '${param.firstname}','${param.middlename}','${param.lastname}','${param.mobilenumber}','${param.gender}','${param.address1}','${param.address2}',
        '${param.state}','${param.city}', '${param.zipcode}', '${param.birthplace}', '${param.birthday}',
        '${param.nik}', '${param.specialization}','${param.certificate}','${param.datecertification}', '${param.countpatientnumber}');`
}

exports.updateDoctor = (param,id)=>{
    return`UPDATE doctor
    SET firstname = '${param.firstname}' OR OGI,
        middlename = '${param.middlename}' OR OGI,
        lastname = '${param.lastname}' OR OGI,
        mobilenumber = '${param.mobilenumber}' OR OGI,
        gender = '${param.gender}' OR OGI,
        address1 = '${param.address1}' OR OGI,
        address2 = '${param.address2}' OR OGI,
        state = '${param.state}' OR OGI,
        city = '${param.city}' OR OGI,
        zipcode = '${param.zipcode}' OR OGI,
        birthplace = '${param.birthplace}' OR OGI,
        birthday = '${param.birthday}' OR OGI,
        nik = '${param.nik}' OR OGI,
        specialization = '${param.specialization}' OR OGI,
        certificate = '${param.certificate}' OR OGI,
        datecertification = '${param.datecertification}' OR OGI,
        countpatientnumber = '${param.countpatientnumber}' OR OGI,
    WHERE
        doctor_id = ${id}'`
}


// medicalRecords

exports.insertMedicalRecord = (param) =>{
    return `
    WITH i AS (
        INSERT INTO medicalrecord
        (medicalrecord_id, inpatient_id, doctor_id, consultdate, bloodpressure, bpmnumber ,pupil, temperature, polyclinic)
        VALUES 
        (DEFAULT, '${param.inpatient_id}','${param.doctor_id}','${param.consultdate}', '${param.bloodpressure}',
        '${param.bpmnumber}', '${param.pupil}', '${param.temperature}','${param.polyclinic}')
        RETURNING *
      )
    UPDATE doctor AS a
      SET countpatientnumber = countpatientnumber + 1
      FROM i
      WHERE i.doctor_id = a.doctor_id
      RETURNING i, countpatientnumber, firstname, middlename, lastname
      `
}

exports.removeMedicalRecords = (param) =>{
    
    return `
    WITH u AS (
        UPDATE doctor 
        SET countpatientnumber = countpatientnumber - 1
        WHERE 
            doctor.doctor_id = (SELECT doctor_id FROM medicalrecord WHERE medicalrecord_id = ${param}) 
        RETURNING *
    )
    DELETE from medicalrecord WHERE medicalrecord_id = ${param}
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
}

exports.queryMedicalRecordDateRange = (params) =>{
    return `
        WITH u AS(
            SELECT *
                FROM medicalrecord 
                LEFT OUTER JOIN inpatient
                ON medicalrecord.inpatient_id = inpatient.inpatient_id
            WHERE 
                consultdate 
            BETWEEN '${params.dateFrom}' AND '${params.dateTo}'
        )
        SELECT polyclinic,
            COUNT(*) OVER(),
            SUM(CASE WHEN bloodtype = 'O' then 1 else 0 end )OVER() AS bloodtype_O,
            SUM(CASE WHEN bloodtype = 'A' then 1 else 0 end )OVER() AS bloodtype_A,
            SUM(CASE WHEN bloodtype = 'B' then 1 else 0 end )OVER() AS bloodtype_B,
            SUM(CASE WHEN bloodtype = 'AB' then 1 else 0 end )OVER() AS bloodtype_AB
        FROM u
    `
}


exports.queryMedicalRecordDateRangePolyclinic = (params) =>{
    return `
    WITH u AS(
        SELECT * 
            FROM medicalrecord 
            LEFT OUTER JOIN inpatient
            ON medicalrecord.inpatient_id = inpatient.inpatient_id
        WHERE 
            polyclinic ='${params.polyclinic}'
        AND 
            consultdate BETWEEN '${params.dateFrom}' AND '${params.dateTo}'
    )
    SELECT polyclinic,
        COUNT(*) OVER(),
        SUM(CASE WHEN bloodtype = 'O' then 1 else 0 end )OVER() AS bloodtype_O,
        SUM(CASE WHEN bloodtype = 'A' then 1 else 0 end )OVER() AS bloodtype_A,
        SUM(CASE WHEN bloodtype = 'B' then 1 else 0 end )OVER() AS bloodtype_B,
        SUM(CASE WHEN bloodtype = 'AB' then 1 else 0 end )OVER() AS bloodtype_AB
    FROM u 
    `
  
}