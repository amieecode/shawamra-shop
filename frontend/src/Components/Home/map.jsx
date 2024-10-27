import React from 'react'

const map = () => {
  return (
    <div className='w-full mb-[1rem] h-[10rem]'>
      <iframe 
        title='Google Map'
        className='w-full h-[19rem] rounded-[10px]'
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.0382050746075!2d-79.40376351597705!3d43.64737346269427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34ddbcb473fb%3A0x7b1c793f902bcd3e!2s498%20Queen%20St%20W%2C%20Toronto%2C%20ON%20M5V%202B3%2C%20Canada!5e0!3m2!1sen!2sng!4v1730017554980!5m2!1sen!2sng" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
  )
}

export default map
