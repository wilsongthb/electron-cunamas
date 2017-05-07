Informacion del hogar
    codigo                      char(6)
    --- facilitador ---
    codigo facilitador          char(6)
    nombre                      char(120)

Tus Niños
    dni                         char(8)
    seguro                      bool
    numero de seguro            char(12)
    fecha de nacimiento         date
    discapacidad                bool
    ---- beneficiario ---
    codigo                      char(6)
    nombres                     char(120)


Cuidador
    codigo                      char(6)
    nombre                      char(120)
    sexo                        char(1)
    parentesco                  option['MAMA', 'PAPA', 'ABUELO']
    -tipo de documento          option['DNI', ]
    dni                         char(8)
    tipo seguro                 option['SIS', 'NO TIENE']
    fecha nacimiento            date
    fecha registro              date
