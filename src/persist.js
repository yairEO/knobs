const VERSION = 1; // current version of persisted data. if code change breaks persisted data, verison number should be bumped.
const STORE_KEY = '@yaireo/knobs/knobs'

const isStringOrNumber = a => typeof a == 'string' || typeof a == 'number';

export function getPersistedData(){
  // if "persist" is "false", do not save to localstorage
  let _store = this.settings.persist,
      customKey = isStringOrNumber(_store) ? '/'+_store : '',
      persistedData,
      versionMatch = localStorage.getItem(`${STORE_KEY + customKey}/v`) == VERSION

  if( versionMatch ){
    try{ persistedData = JSON.parse(localStorage[STORE_KEY + customKey]) }
    catch(err){}
  }

  return persistedData
}

export function setPersistedData(){
  // if "persist" is "false", do not save to localstorage
  let _store = this.settings.persist,
      customKey = isStringOrNumber(_store) ? '/'+_store : '';

  // when wishing to set data:
  if ( _store ){
    let persistedData = JSON.stringify(this.knobs)

    localStorage.setItem(`${STORE_KEY + customKey}/v`, VERSION) // pesisted
    localStorage.setItem(STORE_KEY + customKey, persistedData)

    dispatchEvent( new Event('storage') )
  }
}

