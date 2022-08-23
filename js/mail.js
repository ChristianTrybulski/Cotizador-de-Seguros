// Fetch
const enviarMail = (cotizacion, cotizacionFinal) => {
    const { marca, year, plan } = cotizacion;
    let marcaNombreSel = marcaNombre[marca];
    var data = {
        service_id: 'service_jek94ff',
        template_id: 'template_3wg0ija',
        user_id: '72Cc1_ORBPb6cM6cH',
        template_params: {
            'marca': marcaNombreSel,
            'year': year,
            'plan': plan,
            'cotizacionFinal': cotizacionFinal,
        }
    };

    fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response)); 
}


    