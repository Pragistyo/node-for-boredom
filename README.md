# node-for-boredom (Not-shiny-octo-couscus)

##This project name to avoid github suggested name "shiny-octo-couscus".


## ROUTES

### Main URL
https://provisions-interview.herokuapp.com/provisions/api/v1

#### Inpatient Routes

| Route                                |  HTTP  | Description |
| ------------------------------------ | ------ | --------------|
| `/provisions/api/v1/inpatients`      | GET    | Get all Inpatients data
| `/provisions/api/v1/inpatients`      | POST   | Create one Inpatient data
| `/provisions/api/v1/inpatients/:id`  | GET    | Get one Inpatient data
| `/provisions/api/v1/inpatients/:id`  | PUT    | Update one Inpatient data
| `/provisions/api/v1/inpatients/:id`  | DELETE | Delete one Inpatient data

Body for POST 
(Create one Inpatient data) end Point has to be as example of JSON equivalent below:
```yaml
{
        firstname: 'Budi',
        middlename: 'Agung',
        lastname: 'Saleh',
        mobilenumber: '081298782733',
        gender: 'male',
        address1: 'Jl. Kaliurang, Kuningan, West-Java',
        address2: 'Jl. Penjaringan, North-Jakarta, DKI-Jakarta',
        state: 'Indonesia',
        city: 'DKI-Jakarta',
        zipcode: '14440',
        birthplace: 'Bandung',
        birthday: '1991-01-08',
        bloodtype: 'AB'
    }
```

#### Doctor Routes

| Route                             |  HTTP  | Description |
| --------------------------------- | ------ | --------------|
| `/provisions/api/v1/doctors`      | GET    | Get all doctors data
| `/provisions/api/v1/doctors`      | POST   | Create one doctor data
| `/provisions/api/v1/doctors/:id`  | GET    | Get one doctor data
| `/provisions/api/v1/doctors/:id`  | PUT    | Update one doctor data
| `/provisions/api/v1/doctors/:id`  | DELETE | Delete one doctor data


Body for POST (Create one doctor data) end Point has to be as example of JSON equivalent below:
```yaml
        {
            firstname: 'Ahmad',
            middlename: 'Subekni',
            lastname: 'Dwiantara',
            mobilenumber: '081189472745',
            gender: 'Male',
            address1: 'Jl. Kelinci, Bogor, West-Java',
            address2: 'Jl. Menteng, Central-Jakarta, DKI-Jakarta',
            state: 'Indonesia',
            city: 'DKI-Jakarta',
            zipcode: '10350',
            birthplace: 'Depok',
            birthday: '1970-01-08',
            nik: '1110658214',
            specialization: 'GI-Surgeon',
            certificate: 'GI-Certificate-surgeon',
            datecertification: '2005-05-29' ,
            countpatientnumber:0
        }
```
#### Doctor Routes

| Route                                                    |  HTTP  | Description |
| -------------------------------------------------------- | ------ | --------------|
| `/provisions/api/v1/medicalRecord`                       | GET    | Get all doctors data
| `/provisions/api/v1/medicalRecord`                       | POST   | Create one doctor data
| `/provisions/api/v1/medicalRecord/byDatePolyclinic`      | POST   | Return consult sum by date interval and/or selected polyclinic
| `/provisions/api/v1/medicalRecord/:id`                   | GET    | Get one doctor data
| `/provisions/api/v1/medicalRecord/:id`                   | PUT    | Update one doctor data
| `/provisions/api/v1/medicalRecord/:id`                   | DELETE | Delete one doctor data

Body for POST :
(Create one medicalrecord data) end Point has to be as example of JSON equivalent below:
```yaml
{
    inpatient_id : 4,
    doctor_id : 1,
    consultdate : '2020-01-07',
    bloodpressure : '95',
    bpmnumber : '90',
    pupil : 'normal',
    temperature : '36.80',
    polyclinic : 'GI'
}
```

To Get Data by interval Date and/or selected polyclinic 
```yaml
{
    dateFrom: '2018-01-01',
    dateTo: '2020-06-29',
    polyclinic: 'GI'
}
```

