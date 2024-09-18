#include<stdio.h>
// #define PI 3.14156;
int main(){
    const PI=3.14156;
    printf("Enter radius: ");
    double r,perimiter,area;
    scanf("%lf",&r);
    perimiter = 2 * PI * r;
    printf("\nPerimiter: %.2lf", perimiter);
    area = PI * r * r;
    printf("\nArea: %.2lf", area);
    return 0;
}
