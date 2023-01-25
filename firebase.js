import admin from 'firebase-admin';

const serviceAccount = {
  type: 'service_account',
  project_id: 'project-management-mean',
  private_key_id: 'b980b62955b11521b3a147b89fb1a795e958bd5d',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQClr7VTuLvX/4xq\npnsIsvbpdswA6QWUsXZHGeEEaTbUFztUjzlMnlYG7D+heBohArx7EH+6uvtTSSjz\n9aVkKOphCb3Wtg8O6H01V21LBtvZY3UxFnIyTI8djVm+qE2hT0J4xsfkWFFzlZdG\nToQF88DzS+GgJ0MF+mFWmLruemwuIx7Y/poHK5lElIcrXO6HViUhrHxjodz5qCFS\nevk8fj4y5fPv/GPKnBr25bVMye5nMkicpKrrlmfpYcm0zY9aZUwf94XHbOQmEdp0\n3C3qjxUCCPFfbQQy0aHGn8yiUoY96iCUQA5fT1UCIknVs6paVdjRCWTEUhCxhVIn\n9WN11zXBAgMBAAECggEAAZikFNpjSxMhT8vQGgMKjRCjKePU1SmMceZLCD/o1Tb5\nVXY+XgQqleKH1n2tykPrNmgP+U0uKPpGpqA3FlmXevp6caJDb5WaswqskP1KnVE8\n4VLVxDFqbFARdWxW4vXHQRrAqqJKxsQHXw14Tlv1JR7rOD/X6zut8q+yDC8XTK6P\ngcH/0Zj97B6HbEPldAIqxUZIl6epgFwdCX5YP1vH4M+bfAIFPc+hg35sxxFOSCn+\n/TXIrI1Q/bMu4bjY3A3EeekpUZJLLqh/VjeWToFwwzK0l6F7WhMgmXsEAHLhEHNG\nqVGIkqYSKJlCahf8YO52M5P1aai5soTYlBg0uUnCsQKBgQDY8taMtmCPC2xpVomP\nenxVBBwTPc41YU2m/zbD0RI2S8/B8nI1v4bwyugVciMhc6vfOLdbr4TfPj8f8X08\nNbs34der092titxhiMOqCjcqZDF8A2HhNS0ClxRlqqIeFlRpt61oXx9YnHjY9oAy\nIpV82dwpc3SFjYTKzb3EqndVsQKBgQDDgqqcJaWr1bkDq5f6I9Y2E4YtJimumN9w\noIkuYqsCAwSbeqlf30uITdqYTBOQj0y95NnemCKUQmy3vR9RC90LPfV00LRJA8Je\nWrAgkiKCA2C6u5K5jPYjxEO4ekRoddWCuQz4QBJ3VP7gPHP0uYbQ1mnxfAplRohD\nu9lxidMVEQKBgEVYOaP4l5yhdiGle4rVB/DUw3STCNqfI4cBhKvKpBue1+WSbVco\nxSUqdkyEkx4aLxHGuzUfQUVqTBsVwYYBVrpiAeH2cqEKBa9XW9N6OG/gXsDZA+xM\nZvqw9+AXToJ3eLvh7heyb/6O5UHUaN2dmFK0AF9vfAtEVPHOGZ5HLqXBAoGBAIpv\nimjYS2/Z/JB5vzoSiApwVrC/dgI4Iva35YrfuKDLDEcfWrEVBoG0RtVSAQR6Q2eu\nlQqFhO6f/iU4F+WmVdUxAQ2+/fk5XTa8Vjwp3Z9bzvFKAgG6q0r2HNGSWb/xt8ZB\nS8q4a5rtpy+V/rFJcQmM2SVxpFbD05bKe5Rmd/1RAoGBAKdryIhTalpzIs73Cjz3\nCwMNLDO9Lb2UTdlCs5i2o6rm2v+0+zehBZtiP/GymFMYgFjQW0BxKIGWeQl3RJ45\nQvuBd2hHOLXqokcd/Sb0tWeROmub8KxLSPnIVF2yda5JPFsCFoetfUSFQARF6fVD\nFjgkWQrmNWeeEgEyP8NiKObb\n-----END PRIVATE KEY-----\n',
  client_email:
    'firebase-adminsdk-xg4kr@project-management-mean.iam.gserviceaccount.com',
  client_id: '118356446068267185167',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xg4kr%40project-management-mean.iam.gserviceaccount.com',
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'project-management-mean.appspot.com',
});

const bucket = admin.storage().bucket();

const uploadImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const image = req.file;
  const name = Date.now() + '---' + image.originalname;
  const file = bucket.file(name);

  const stream = file.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    },
  });

  stream.on('error', (err) => {
    next(err);
  });

  stream.on('finish', async () => {
    console.log('finish');
    await file.makePublic();
    req.file = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
    next();
  });

  stream.end(image.buffer);
};

const uploadFiles = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next();
  }

  const files = req.files;
  const urls = [];

  for (let file of files) {
    const name = Date.now() + '---' + file.originalname;
    const bucketFile = bucket.file(name);

    const stream = bucketFile.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on('error', (err) => {
      next(err);
    });

    stream.on('finish', async () => {
      console.log('finish');
      await bucketFile.makePublic();
      urls.push(
        `https://storage.googleapis.com/${bucket.name}/${bucketFile.name}`
      );
      if (urls.length === files.length) {
        req.files = urls;
        next();
      }
    });

    stream.end(file.buffer);
  }
};

const deleteImage = async (imageUrl) => {
  const name = imageUrl.split('/').pop();
  const file = bucket.file(name);
  await file.delete();
};

const deleteFiles = async (fileUrl) => {
  const name = fileUrl.split('/').pop();
  const bucketFile = bucket.file(name);
  await bucketFile.delete();
};

export { uploadImage, deleteImage, uploadFiles, deleteFiles };
