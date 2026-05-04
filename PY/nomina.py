# Autor: Santiago Rey
 
SALARIO_MINIMO = 1_300_000
TOPE_AUXILIO = 2 * SALARIO_MINIMO          
AUXILIO_TRANSPORTE = 160_000
PORCENTAJE_DEDUCCION = 0.08                
 
empleados = []
 
 
def registrar_empleado():
    print("\n--- Registrar Empleado ---")
    nombre = input("Nombre del empleado: ").strip()
    
    try:
        salario_base = float(input("Salario base ($): "))
        dias_trabajados = int(input("Días trabajados en el mes: "))
    except ValueError:
        print("⚠ Error: ingresa valores numéricos válidos.")
        return
 
    empleado = {
        "nombre": nombre,
        "salario_base": salario_base,
        "dias_trabajados": dias_trabajados,
    }
    empleados.append(empleado)
    print(f"✓ Empleado '{nombre}' registrado correctamente.")
 
 
def calcular_nomina():
    print("\n--- Cálculo de Nómina ---")
 
    if not empleados:
        print("⚠ No hay empleados registrados.")
        return
 
    for emp in empleados:
        nombre = emp["nombre"]
        salario_base = emp["salario_base"]
        dias_trabajados = emp["dias_trabajados"]
 

        salario_proporcional = (salario_base / 30) * dias_trabajados
 

        auxilio = AUXILIO_TRANSPORTE if salario_base < TOPE_AUXILIO else 0
 

        deduccion = salario_proporcional * PORCENTAJE_DEDUCCION
 

        pago_neto = salario_proporcional + auxilio - deduccion
 
        print(f"\n{'='*40}")
        print(f"  Empleado     : {nombre}")
        print(f"  Salario base : ${salario_base:,.0f}")
        print(f"  Días trab.   : {dias_trabajados}/30")
        print(f"  Sal. prop.   : ${salario_proporcional:,.0f}")
        print(f"  Auxilio trans: ${auxilio:,.0f}")
        print(f"  Deducción 8% : -${deduccion:,.0f}")
        print(f"  PAGO NETO    : ${pago_neto:,.0f}")
        print(f"{'='*40}")
 
 
def menu():
    print("\n-------------------------------")
    print("   SISTEMA DE NÓMINA STARTUP  ")
    print("-------------------------------")
    print("  1. Registrar empleado       ")
    print("  2. Calcular nómina          ")
    print("  3. Salir                    ")
    print("-------------------------------")
 
 
def main():
    while True:
        menu()
        opcion = input("Selecciona una opción: ").strip()
 
        if opcion == "1":
            registrar_empleado()
        elif opcion == "2":
            calcular_nomina()
        elif opcion == "3":
            print("👋 ¡Hasta luego!")
            break
        else:
            print("⚠ Opción no válida. Intenta de nuevo.")
 
 
if __name__ == "__main__":
    main()