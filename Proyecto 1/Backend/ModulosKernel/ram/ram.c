//Header obligatorio de todos los modulos
#include <linux/module.h>
//Header para usar KERN_INFO
#include <linux/kernel.h>

//Header para los macros module_init y module_exit
#include <linux/init.h>
//Header necesario porque se usara proc_fs
#include <linux/proc_fs.h>
/* for copy_from_user */
#include <asm/uaccess.h>	
//Para escribir en el Proc
#include <linux/seq_file.h>

//importar librería sysinfo
#include <linux/hugetlb.h>

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("SOPES1 Proyecto 1, Modulo Ram");
MODULE_AUTHOR("Audrie Annelisse del Cid Ochoa");

//Estructura que contiene todla la información de sysinfo
struct sysinfo inf;
//Funcion que se ejectua cada vez que se lee el archivo con el comando CAT
static int escribir_archivo(struct seq_file *archivo, void *v)
{   
    unsigned long memoria_total;
    unsigned long memoria_libre;
    unsigned long memoria_consumida;
    unsigned long memoria_cache;
    unsigned long memoria_compartida;
    unsigned long porcentaje;
    //Lleno mi estructura con los datos de memoria ram
    si_meminfo(&inf);
    memoria_total= inf.totalram*inf.mem_unit;
    memoria_libre= inf.freeram*inf.mem_unit;
    memoria_cache= (inf.bufferram*9*inf.mem_unit);
    memoria_compartida= inf.sharedram*inf.mem_unit;
    memoria_consumida= (inf.totalram-(((inf.bufferram*9))+inf.freeram))*inf.mem_unit;

    porcentaje= (((memoria_consumida/(1024*1024))+440)/(memoria_total/(1024*1024)))*100;
    
    // seq_printf(archivo,"{\n");
    // seq_printf(archivo, "\"Memoria_Total\": \"%8li\", \n", memoria_total/(1024*1024));
    // seq_printf(archivo, "\"Memoria_Libre\": \"%8li\", \n", memoria_libre/(1024*1024));
    // seq_printf(archivo, "\"Memoria_cache\": \"%8li\", \n", (memoria_cache/(1024*1024))-400);
    // seq_printf(archivo, "\"Memoria_Compartida\": \"%8li\" \n", memoria_compartida/(1024*1024));
    // seq_printf(archivo, "}");
    
    seq_printf(archivo, "%8li ", memoria_total/(1024*1024));
    seq_printf(archivo, " %8li \n", memoria_libre/(1024*1024));
    return 0;
}

//Funcion que se ejecuta cada vez que se lee el archivo con el comando CAT
static int al_abrir(struct inode *inode, struct file *file)
{
    return single_open(file, escribir_archivo, NULL);
}

//Si el kernel es 5.6 o mayor se usa la estructura proc_ops
static struct proc_ops operaciones =
{
    .proc_open = al_abrir,
    .proc_read = seq_read
};

/*Si el kernel es menor al 5.6 usan file_operations
static struct file_operations operaciones =
{
    .open = al_abrir,
    .read = seq_read
};
*/

//Funcion a ejecuta al insertar el modulo en el kernel con insmod
static int _insert(void)
{
    //Creando Modulo en /procs
    proc_create("memo_201801263", 0, NULL, &operaciones);
    printk(KERN_INFO "201801263\n");
    return 0;
}

//Funcion a ejecuta al remover el modulo del kernel con rmmod
static void _remove(void)
{
    //Eliminando Módulo en /procks
    remove_proc_entry("memo_201801263", NULL);
    printk(KERN_INFO "Sistemas Operativos 1\n");
}

module_init(_insert);
module_exit(_remove);