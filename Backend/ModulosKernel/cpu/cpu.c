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
#include <linux/sched.h>

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("SOPES1 Proyecto 1, Modulo Ram");
MODULE_AUTHOR("Audrie Annelisse del Cid Ochoa");

//Estructura que contiene toda la información de un proceso
struct task_struct *proceso, *proceso_hijo;
//Estructura que contiene la información de los nodos del arbol
struct list_head *hijos;

//Funcion que se ejectua cada vez que se lee el archivo con el comando CAT
static int escribir_archivo(struct seq_file *archivo, void *v)
{   
    //Obtener el listado de procesos en ejecución
    for_each_process(proceso){
        seq_printf(archivo, "Proceso %s (PID: %d )\n",proceso->comm, proceso->pid);
        list_for_each(hijos, &(proceso->children)){
            proceso_hijo=list_entry(hijos, struct task_struct, sibling);
            seq_printf(archivo, "\t Proceso hijo %s (PID: %d)\n",proceso_hijo->comm, proceso_hijo->pid);
        }
    }

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
    proc_create("cpu_201801263", 0, NULL, &operaciones);
    printk(KERN_INFO "Audrie Annelisse del Cid Ochoa\n");
    return 0;
}

//Funcion a ejecuta al remover el modulo del kernel con rmmod
static void _remove(void)
{
    //Eliminando Módulo en /procks
    remove_proc_entry("cpu_201801263", NULL);
    printk(KERN_INFO "Diembre 2021\n");
}

module_init(_insert);
module_exit(_remove);