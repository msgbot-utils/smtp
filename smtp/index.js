importClass(javax.mail.Authenticator)
importClass(javax.mail.PasswordAuthentication)
importClass(javax.mail.internet.MimeMessage)
importClass(javax.mail.Session)
importClass(java.util.Properties)
importClass(javax.mail.Transport)
importClass(javax.mail.internet.InternetAddress)
importClass(javax.mail.Message)

module.exports = (function(){
    function Mail(){
        this.message = null;
    }

    /**
     * @param {string} url
     * @param {"TLS"|"SSL"|null} protocol
     * @param {string} id
     * @param {string} pw
     * @return {Mail}
     */
    Mail.getInstance = function(url, protocol, id, pw){
        let instance = new Mail()

        let props = new Properties()

        props.put("mail.smtp.host", url);
        props.put("mail.smtp.auth", "true")

        if(protocol.toUpperCase() == "TLS"){
            props.put("mail.smtp.port", "587")
            props.put("mail.smtp.starttls.enable", "true")
        }else if(protocol.toUpperCase() == "SSL"){
            props.put("mail.smtp.port", "465")
            props.put("mail.smtp.ssl.enable", "true")
        }else{
            props.put("mail.smtp.port", "25")
        }

        let auth = new Authenticator({
            getPasswordAuthentication: function(){
                return new PasswordAuthentication(id, pw)
            }
        })
        let session = Session.getDefaultInstance(props, auth);
        let message = new MimeMessage(session)
        instance.message = message

        return instance
    }

    /**
     * @param {string} from
     */
    Mail.prototype.from = function(from){
        this.message.setFrom(new InternetAddress(from))
    }

    /**
     * @param {string} to
     */
    Mail.prototype.to = function(to){
        if(to instanceof Array) to.map(e=>new InternetAddress(e))
        else to = new InternetAddress(to)

        this.message.setRecipient(Message.RecipientType.TO, to)
    }

    /**
     * @param {string} title
     */
    Mail.prototype.setTitle = function(title){
        this.message.setSubject(title)
    }

    /**
     * @param {string} content
     * @param {string} type - mime type
     */
    Mail.prototype.setContent = function(content, type){
        if(!type) type = "text/plain"
        this.message.setContent(content, type)
    }

    Mail.prototype.send = function(){
        Transport.send(this.message)
    }

    return Mail
})()
